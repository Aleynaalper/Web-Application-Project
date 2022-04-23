package com.example.shelltox.services;

import com.example.shelltox.entities.User;
import com.example.shelltox.repos.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User newUser) {
        return userRepository.save(newUser);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    /*
    public User updateUser(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            User foundUser = user.get();
            foundUser.setUserName(newUser.getUserName());
            foundUser.setPassword(newUser.getPassword());
            userRepository.save(foundUser);
            return foundUser;
        }else
            return null;
    }
    */


    public User updateProfile(Long userId, User newUser){
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            User foundUser = user.get();
            if(newUser.getPassword() != null)
            foundUser.setPassword(newUser.getPassword());
            if(newUser.getTitle() != null)
            foundUser.setTitle(newUser.getTitle());
            if(newUser.getSkills() != null)
            foundUser.setSkills(newUser.getSkills());
            if(newUser.getAbout() != null)
            foundUser.setAbout(newUser.getAbout());
            if(newUser.getFirstName() != null)
            foundUser.setFirstName(newUser.getFirstName());
            if(newUser.getLastName() != null)
            foundUser.setLastName(newUser.getLastName());
            if(newUser.getPhoto() != null)
                foundUser.setPhoto(newUser.getPhoto());
            userRepository.save(foundUser);
            return foundUser;
        }else
            return null;
    }



    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}