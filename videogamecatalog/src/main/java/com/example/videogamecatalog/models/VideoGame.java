package com.example.videogamecatalog.models;



import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class VideoGame {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "name must not be empty")
    private String name;
    @NotBlank(message = "developer must not be empty")
    private String developer;
    @NotBlank(message = "image must not be empty")
    private String imageUrl;
    private String genre;
    private String playerMode;
    @Lob
    private String description;

    public VideoGame(){}

    public VideoGame(String name, String developer, String imageUrl, String genre, String playerMode, String description) {
        this.name = name;
        this.developer = developer;
        this.imageUrl = imageUrl;
        this.genre = genre;
        this.playerMode = playerMode;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeveloper() {
        return developer;
    }

    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getPlayerMode() {
        return playerMode;
    }

    public void setPlayerMode(String playerMode) {
        this.playerMode = playerMode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
