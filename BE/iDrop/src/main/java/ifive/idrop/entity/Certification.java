package ifive.idrop.entity;

import jakarta.persistence.*;

@Entity
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certification_id")
    private Long id;
    private String name;
    private String code;
}
