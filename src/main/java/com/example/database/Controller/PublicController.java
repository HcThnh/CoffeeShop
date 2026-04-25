package com.example.database.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.database.Customer.customerDTO;
import com.example.database.Gift.giftResponseDto;
import com.example.database.Product.productResponseDto;
import com.example.database.Relationship.reviewResponseDto;
import com.example.database.Service.customerService;
import com.example.database.Service.giftService;
import com.example.database.Service.productService;
import com.example.database.jwt.JwtUtils;
import com.example.database.jwt.LoginRequest;
import com.example.database.jwt.LoginResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/public")
public class PublicController {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired 
    private customerService customerService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    DataSource dataSource;
    @Autowired
    private productService productService;
    @Autowired
    private giftService giftService;
    
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        LoginResponse response = new LoginResponse(userDetails.getUsername(), roles, jwtToken);

        return ResponseEntity.ok(response);
    }
    @Transactional
    @PostMapping("customer/createAccount")
    public String createCustomer(@RequestBody customerDTO dto) 
    {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
        if(manager.userExists(dto.phoneNumber())){return "Username already exists";}

        UserDetails user = User.withUsername(dto.phoneNumber())
        .password(passwordEncoder.encode(dto.password()))
        .roles("CUSTOMER")
        .build();
        manager.createUser(user);
        customerService.createCustomer(dto);
        return "Your account is created successfully!";
    }
    //api này không cần code vào react, t dùng để tạo tài khoản admin
    @PostMapping("admin")
    public String createManager(@RequestBody LoginRequest dto) 
    {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
        if(manager.userExists(dto.getUsername())){return "Username already exists";}

        UserDetails user = User.withUsername(dto.getUsername())
        .password(passwordEncoder.encode(dto.getPassword()))
        .roles("MANAGER")
        .build();
        manager.createUser(user);
        return "Your account is created successfully!";
    }

    @GetMapping("/menu")
    public List<productResponseDto> getAllProducts() {
        return productService.getAllProducts();
    }
    @GetMapping("/gift/view")
    public List<giftResponseDto> getAllGifts() {
        return giftService.findAllGift();
    }
    @GetMapping("/product/review")
    public List<reviewResponseDto> getProductReview(@RequestParam int productId) {
        return productService.getReview(productId);
        //return new String();
    }
    
    
}
// @PreAuthorize("hasRole('CUSTOMER')")  //use to specify role access should go with enableMethodSecurity
// @GetMapping("/user")
// public String userPage(
//     Principal principal,
//     Authentication authentication
// ) 
// {
//     return principal.getName(); //get username
//     // return authentication.getAuthorities().stream()
//     // .map(GrantedAuthority::getAuthority)
//     // .collect(Collectors.toList());                    //get role, role sẽ ở dạng ROLE_TÊN ROLE
// }