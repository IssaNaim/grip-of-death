package com.issa.h2.controller;

import com.issa.h2.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class GameController {
    private String message;

    @Autowired
    private LoginService loginService;

    @GetMapping("/index")
    public String index(Model model){
        model.addAttribute("loginStatus", message);
        return "index";
    }

    @GetMapping("/logout")
    public String logout(Model model){
        message = "";
        model.addAttribute("loginStatus", message);
        return "redirect:/index";
    }

    @GetMapping("/menu")
    public String menu(Model model){
        model.addAttribute("username", message);
        return "menu";
    }

    @GetMapping("/login")
    public String getUser(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password){
        message = loginService.getLogin(email, password);
        if(message.equals("Wrong email or password!")){
            return "redirect:/index";
        } else{
            return "redirect:/menu";
        }
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam(name = "username") String username, @RequestParam(name = "email") String email, @RequestParam(name = "password") String password) {
        String msg = loginService.registerUser(username, email, password);
        if(msg.equals("Email already registered!")){
            message = "Email already registered!";
            return "redirect:/index";
        }
        message = "Login with your new account :)";
        return "redirect:/index";
    }

    @GetMapping("/offline")
    public String offlineGame(){
        return "offline";
    }

    @GetMapping("/game/{gameId}/{choice}/{username}")
    public String game(Model model, @PathVariable String gameId, @PathVariable String choice, @PathVariable String username){
        model.addAttribute("userName", message);
        model.addAttribute("gameId", gameId);
        model.addAttribute("choice", choice);
        model.addAttribute("username", username);
        return "game";
    }

    @GetMapping("/win/{username}")
    public void win(@PathVariable String username){
        loginService.addWin(username);
    }

    @MessageMapping("/game")
    @SendTo("/game")
    public String exchange(){
        return "Connected to socket";
    }
}