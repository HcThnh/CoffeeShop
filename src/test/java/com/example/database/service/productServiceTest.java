package com.example.database.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.example.database.dto.request.productImageRequestDto;
import com.example.database.entity.product;
import com.example.database.entity.productImage;
import com.example.database.repository.productImageRepo;
import com.example.database.repository.productRepo;

@ExtendWith(MockitoExtension.class)
class productServiceTest {
    @Mock
    private productRepo productRepo;

    @Mock
    private productImageRepo productImageRepo;

    @InjectMocks
    private productService productService;

    @Test
    void firstImageBecomesPrimary() {
        product product = new product();
        product.setId(7);
        when(productRepo.findById(7)).thenReturn(Optional.of(product));
        when(productImageRepo.findByProductIdOrderBySortOrderAscIdAsc(7)).thenReturn(List.of());

        productService.addProductImage(
            7,
            new productImageRequestDto("https://cdn.example.com/latte.webp", "Latte", 0, false)
        );

        ArgumentCaptor<productImage> imageCaptor = ArgumentCaptor.forClass(productImage.class);
        verify(productImageRepo).save(imageCaptor.capture());
        productImage savedImage = imageCaptor.getValue();
        assertTrue(savedImage.isPrimary());
        assertEquals("https://cdn.example.com/latte.webp", savedImage.getImageUrl());
        assertEquals(7, savedImage.getProduct().getId());
    }

    @Test
    void rejectsNonHttpImageUrl() {
        when(productRepo.findById(7)).thenReturn(Optional.of(new product()));

        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> productService.addProductImage(
                7,
                new productImageRequestDto("file:///private/image.png", null, 0, false)
            )
        );

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        verify(productImageRepo, never()).save(any());
    }

    @Test
    void selectingPrimaryClearsPrimaryFlagFromOtherImages() {
        productImage first = new productImage();
        first.setId(1L);
        first.setPrimary(true);
        productImage second = new productImage();
        second.setId(2L);
        second.setPrimary(false);
        when(productImageRepo.findByProductIdOrderBySortOrderAscIdAsc(7))
            .thenReturn(List.of(first, second));
        when(productImageRepo.findByIdAndProduct_Id(2L, 7)).thenReturn(Optional.of(second));

        productService.setPrimaryProductImage(7, 2L);

        assertFalse(first.isPrimary());
        assertTrue(second.isPrimary());
    }
}
