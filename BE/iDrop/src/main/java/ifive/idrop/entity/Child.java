package ifive.idrop.entity;

import ifive.idrop.entity.enums.Gender;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "child_id")
    private Long id;
    private String name;
    private LocalDate birth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Parent parent;

    @OneToMany(mappedBy = "child")
    private List<PickUpInfo> pickUpInfoList = new ArrayList<>();
}
