package com.example.shelltox.requests;

import lombok.Data;

@Data
public class RegisterRequest {
    String userName;
    String password;
    String mail;
}
