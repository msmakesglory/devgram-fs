package com.devgram.models;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "post_team")
public class PostTeam implements Serializable {

    @EmbeddedId
    private PostTeamId id;

    @ManyToOne
    @MapsId("postId")
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;


    public PostTeam() {}

    public PostTeam(Post post, User user, Role role) {
        this.id = new PostTeamId(post.getPostId(), user.getUserId());
        this.post = post;
        this.user = user;
        this.role = role;
    }


    public enum Role {
        OWNER, COLLABORATOR
    }
}