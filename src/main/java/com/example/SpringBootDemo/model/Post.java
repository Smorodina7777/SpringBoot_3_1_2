package com.example.SpringBootDemo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "posts")
@Data
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String postName;
  private String author;
  private LocalDate pubDate;
  private String pubDescribe;

  @ManyToOne(fetch = FetchType.EAGER)
  @ToString.Exclude
  private User user;

}
