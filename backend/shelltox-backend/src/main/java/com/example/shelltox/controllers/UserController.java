package com.example.shelltox.controllers;

import com.example.shelltox.entities.User;
import com.example.shelltox.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController extends EditProfileController {

    public UserController(UserService userService) {
        super(userService);
    }

    @GetMapping
    public List<User> allUsers(){
        return userService.allUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User newUser) {

        return userService.saveUser(newUser);
    }


    @GetMapping("/{userId}")
    public User getUser(@PathVariable Long userId) {
        // exception handling !!!!
        return userService.getUserById(userId);
    }}


