package com.example.database.entity.embedded;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class review_embed implements Serializable {
    private int customerId;
    private int productId;
}
