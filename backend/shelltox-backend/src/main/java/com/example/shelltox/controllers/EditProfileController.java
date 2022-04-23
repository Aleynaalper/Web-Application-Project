package com.example.shelltox.controllers;

import com.example.shelltox.entities.User;
import com.example.shelltox.repos.UserRepository;
import com.example.shelltox.services.UserService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


public class EditProfileController {

    protected UserService userService;

    public EditProfileController(UserService userService) {
        this.userService = userService;
    }


    @PutMapping("/{userId}")
    public User updateProfile(@PathVariable Long userId, @RequestBody User newUser) {
        return userService.updateProfile(userId, newUser);
    }

     /*
    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User newUser) {
        return userService.updateUser(userId, newUser);
    }
    */
    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUserById(userId);
    }
}

