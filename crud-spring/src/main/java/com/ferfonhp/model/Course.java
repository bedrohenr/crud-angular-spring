package com.ferfonhp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
//@Table(name == "cursos")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 200, nullable = false)
    //@Column(name == "nome") // Vincula nome da coluna a esta var
    private String name;

    @Column(length = 10, nullable = false)
    //@Column(category == "categoria") // Vincula nome da coluna a esta var
    private String category;

}
