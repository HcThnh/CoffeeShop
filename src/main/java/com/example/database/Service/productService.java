package com.example.database.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.database.util.mapper.productMapper;
import com.example.database.dto.request.productImageRequestDto;
import com.example.database.dto.request.productDto;
import com.example.database.dto.request.productUpdateDto;
import com.example.database.dto.response.productResponseDto;
import com.example.database.dto.response.reviewResponseDto;
import com.example.database.entity.productImage;
import com.example.database.repository.productImageRepo;
import com.example.database.repository.productRepo;

@Service
public class productService {
    private productRepo repo;
    private productImageRepo imageRepo;
    private productMapper mapper;

    public productService(
        productRepo repo,
        productImageRepo imageRepo,
        productMapper mapper
    ) {
        this.repo = repo;
        this.imageRepo = imageRepo;
        this.mapper = mapper;
    }

    public void addProduct(productDto dto){
        repo.save(mapper.tProduct(dto));
    }
    public List<productResponseDto> getAllProducts(){
        return repo.findByIsAvailable(true).stream()
        .map(mapper::toProductResponseDto)
        .collect(Collectors.toList());
    }
    public productResponseDto getProduct(int id) {
        var product = repo.findWithImagesByIdAndIsAvailableTrue(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        return mapper.toProductResponseDto(product);
    }
    @Transactional
    public void addProductImage(int productId, productImageRequestDto dto) {
        var product = repo.findById(productId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        String imageUrl = validateImageUrl(dto.imageUrl());
        if (dto.sortOrder() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image sort order cannot be negative");
        }
        List<productImage> images = imageRepo.findByProductIdOrderBySortOrderAscIdAsc(productId);
        boolean makePrimary = dto.primary() || images.isEmpty();
        if (makePrimary) {
            images.forEach(image -> image.setPrimary(false));
        }

        productImage image = new productImage();
        image.setImageUrl(imageUrl);
        image.setAltText(dto.altText());
        image.setSortOrder(dto.sortOrder());
        image.setPrimary(makePrimary);
        image.setProduct(product);
        imageRepo.save(image);
    }
    @Transactional
    public void deleteProductImage(int productId, Long imageId) {
        productImage image = imageRepo.findByIdAndProduct_Id(imageId, productId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product image not found"));
        boolean wasPrimary = image.isPrimary();
        imageRepo.delete(image);

        if (wasPrimary) {
            imageRepo.findByProductIdOrderBySortOrderAscIdAsc(productId).stream()
                .findFirst()
                .ifPresent(nextImage -> nextImage.setPrimary(true));
        }
    }
    @Transactional
    public void setPrimaryProductImage(int productId, Long imageId) {
        List<productImage> images = imageRepo.findByProductIdOrderBySortOrderAscIdAsc(productId);
        if (images.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product image not found");
        }
        productImage primaryImage = imageRepo.findByIdAndProduct_Id(imageId, productId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product image not found"));
        images.forEach(image -> image.setPrimary(image.getId().equals(primaryImage.getId())));
    }
    private String validateImageUrl(String value) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image URL is required");
        }
        try {
            URI uri = URI.create(value.trim());
            String scheme = uri.getScheme();
            if (uri.getHost() == null || scheme == null
                || !(scheme.equalsIgnoreCase("http") || scheme.equalsIgnoreCase("https"))) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image URL must be an absolute HTTP or HTTPS URL");
            }
            return uri.toString();
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid image URL", exception);
        }
    }
    public void hideProduct(int id){
        repo.hideProduct(id);
    }
    public void delProduct(int id){
        repo.deleteById(id);
    }
    public List<reviewResponseDto> getReview(int productId){
        var product = repo.findById(productId).orElse(null);
        var reviewList = product.getReviews();
        List<reviewResponseDto> res = new ArrayList<>();
        for(var i: reviewList){
            var reviewResponseDto = new reviewResponseDto(i.getId(),i.getDate(), i.getScore(),i.getComment(),i.getCustomer().getName(),product.getName());
            res.add(reviewResponseDto);
        }
        return res;
    }
    public void updateProduct(productUpdateDto dto){
        repo.updateProduct(dto.id(),dto.name(),dto.unit_price(),dto.discount());
    }
}
