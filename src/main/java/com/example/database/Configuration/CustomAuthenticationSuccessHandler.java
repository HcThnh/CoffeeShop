package com.example.database.Configuration;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;


@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, 
                                        Authentication authentication) 
                                        throws IOException, ServletException {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Collection<? extends GrantedAuthority> listRole = userDetails.getAuthorities();
        String url;
        for(var i: listRole){
            if(i.getAuthority().equals("ROLE_CUSTOMER")) url=""; //homepage of customer
            if(i.getAuthority().equals("ROLE_EMPLOYEE")) url="http://localhost:5173/emp/order-form";
            if(i.getAuthority().equals("ROLE_MANAGER")) url="http://localhost:5173/admin/home";
        }
        response.sendRedirect("url");
    }
}
