package com.example.SpringBootDemo.controller;

import com.example.SpringBootDemo.model.Post;
import com.example.SpringBootDemo.model.User;
import com.example.SpringBootDemo.service.PostService;
import com.example.SpringBootDemo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(value = "/rest/admin")
@AllArgsConstructor
public class RestControllerTest {

    @Autowired
    UserService userService;
    @Autowired
     PostService postService;

    @PostMapping(value = "/")
    public ResponseEntity<User> create(@RequestBody User user) {
        userService.save(user);
        System.out.println(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }



    @GetMapping(value = "/")
    public ResponseEntity<List<User>> getAll() {
        List<User> users = userService.listAll();
        return users != null && !users.isEmpty() ? new ResponseEntity<>(users, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUser(@PathVariable(name = "id") int id) {
        User user = userService.get((long) id);
        return user != null ? new ResponseEntity<>(user, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable(name = "id") int id) {
        userService.delete((long) id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping(value = "/post")
    public ResponseEntity<List<Post>> getAllPost(){
        List<Post> posts = postService.listAllPosts();
        posts.sort(Comparator.comparing(Post::getPubDate).reversed());
        return posts != null && !posts.isEmpty() ? new ResponseEntity<>(posts, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/post/{postId}")
    public ResponseEntity<User> deletePost(@PathVariable(name = "postId") Long id){
        postService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping(value = "post/{postId}")
    public ResponseEntity<Post> getPost(@PathVariable(name= "postId") Long id){
        Post post = postService.get(id);
        return post != null ? new ResponseEntity<>(post,HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
