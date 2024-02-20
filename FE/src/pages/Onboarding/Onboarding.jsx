import styles from "./Onboarding.module.scss";
import logoIcon from "@/assets/logo.svg";
import truckIcon from "@/assets/truck.png";
import userIcon from "@/assets/user_icon.svg";
import { Type } from "@/components/Onboarding/Type";
import { getAccessToken } from "../../utils/auth";
import { redirect } from "react-router-dom";

export default function Onboarding() {
    return (
        <main className={styles.container}>
            <img src={logoIcon} alt="logo" className={styles.logoIcon} />
            <h1 className={styles.comment}>유형을 선택해 주세요</h1>
            <section className={styles.options}>
                <Type
                    type="운전기사"
                    img={truckIcon}
                    url="/login?user=driver"
                />
                <Type type="부모" img={userIcon} url="/login?user=parent" />
            </section>
        </main>
    );
}

export function loader() {
    const token = getAccessToken();

    if (token) {
        return redirect("/menu");
    }
    return null;
}
