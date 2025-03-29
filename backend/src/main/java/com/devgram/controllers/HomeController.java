package com.devgram.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/public")
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Hello World!";
    }
}
