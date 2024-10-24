import { Coupon } from "../../types.ts";
import { useState } from "react";

interface Props {
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const useCouponEditor = ({ onCouponAdd }: Props) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const addCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const onCouponChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string
  ) => {
    let value: string | number;

    switch (key) {
      case "discountType":
        value = e.target.value as "amount" | "percentage";
        break;
      case "discountValue":
        value = parseFloat(e.target.value); // 숫자형으로 변환
        break;
      default:
        value = e.target.value;
        break;
    }

    setNewCoupon({ ...newCoupon, [key]: value });
  };

  return { newCoupon, addCoupon, onCouponChange };
};
