package com.example.SpringBootDemo.controller;

import com.example.SpringBootDemo.model.Role;
import com.example.SpringBootDemo.model.User;
import com.example.SpringBootDemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ModelAndView allUsers(){
        List<User> users = userService.listAll();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("admin");
        modelAndView.addObject("users",users);
        return modelAndView;
    }

    @GetMapping("edit/{id}")
    public String editPage(@PathVariable("id") int id, Model model){
        User user = userService.get(id);
        model.addAttribute("user", user);
        model.addAttribute("roles", Role.values());
        return "editPage";
    }

    @PostMapping("edit")
    public ModelAndView editUser(@ModelAttribute("user") User user){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("redirect:/admin");
        userService.save(user);
        return modelAndView;
    }

    @GetMapping("/add")
    public ModelAndView addPage(){
        ModelAndView  modelAndView = new ModelAndView();
        modelAndView.setViewName("addPage");
        modelAndView.addObject("user",new User());
        modelAndView.addObject("roles",Role.values());
        return modelAndView;
    }

    @PostMapping("/add")
    public  ModelAndView addUser(@ModelAttribute("user") User user){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("redirect:/admin");
        userService.save(user);
        return modelAndView;
    }

    @GetMapping("/delete/{id}")
    public ModelAndView deleteUser(@PathVariable("id") int id){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("redirect:/admin");
        userService.delete(id);
        return modelAndView;
    }
}
