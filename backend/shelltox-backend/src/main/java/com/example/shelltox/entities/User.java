package com.example.shelltox.entities;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String userName;
    String password;

    String title;
    String about;
    String firstName;
    String lastName;
    String skills;
    String photo;
}
