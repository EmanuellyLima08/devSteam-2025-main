import React, { useState } from "react";

const Cupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState("");

  const handleAddCoupon = () => {
    if (newCoupon.trim()) {
      setCoupons([...coupons, newCoupon]);
      setNewCoupon("");
    }
  };

  const handleRemoveCoupon = (coupon) => {
    setCoupons(coupons.filter((c) => c !== coupon));
  };

  return (
    <div>
      <h1>Gerenciar Cupons</h1>
      <input
        type="text"
        placeholder="Novo Cupom"
        value={newCoupon}
        onChange={(e) => setNewCoupon(e.target.value)}
      />
      <button onClick={handleAddCoupon}>Adicionar</button>
      <ul>
        {coupons.map((coupon, index) => (
          <li key={index}>
            {coupon} <button onClick={() => handleRemoveCoupon(coupon)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cupons;