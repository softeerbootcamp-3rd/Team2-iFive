package ifive.idrop.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parent_id")
    private Long id;
    private String name;
    private String phone;
    @OneToMany(mappedBy = "parent")
    private List<Child> childList = new ArrayList<>();
}
