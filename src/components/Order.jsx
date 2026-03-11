import { useState, useEffect } from "react";
import gsap from "gsap";

const priceList = {
    "Chocolate Chip Cookie": 300,
    "Oatmeal Raisin Cookie": 400,
    "Butter Shortbread": 280,
    "Double Chocolate Cookie": 300,
    "Almond Biscotti": 500,
    "Classic Chocolate Cake": 500,
    "Vanilla Dream Cake": 480,
    "Red Velvet Cake": 520,
    "Black Forest Cake": 550,
    "Strawberry Delight Cake": 530,
    "Rainbow Funfetti Cake": 510
};

function Order() {
    const [formData, setFormData] = useState({
        name: "",
        item: "Classic Chocolate Cake",
        quantity: 1,
        weight: 1,
        number: "",
        date: "",
        location: "",
        message: "",
        paymentMethod: "Cash on Delivery"
    });

    const [discountCode, setDiscountCode] = useState("");
    const [discountValue, setDiscountValue] = useState(0);
    const [discountMsg, setDiscountMsg] = useState("");
    const [bill, setBill] = useState(null);
    const [cart, setCart] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const applyDiscount = () => {
        if (discountCode.trim().toUpperCase() === "CAKE10") {
            setDiscountValue(0.10);
            setDiscountMsg("Success! 10% discount applied.");
        } else {
            setDiscountValue(0);
            setDiscountMsg("Invalid code. Try CAKE10.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let unitPrice = priceList[formData.item] || 0;
        let total = formData.item.toLowerCase().includes("cake") ? unitPrice * formData.weight : unitPrice * formData.quantity;
        let discountAmt = total * discountValue;
        let finalTotal = total - discountAmt;

        const newBill = {
            ...formData,
            total,
            discountAmt,
            finalTotal,
            discountCode: discountValue > 0 ? "CAKE10" : ""
        };
        setBill(newBill);
    };

    const addToCart = () => {
        if (bill) {
            setCart([...cart, bill]);
            setBill(null);
        }
    };

    const sendWhatsApp = (data) => {
        const phone = "919289282269";
        const waMsg = encodeURIComponent(
            `New Cake House Order!\n\nName: ${data.name}\nNumber: ${data.number}\nLocation: ${data.location}\nDate: ${data.date}\nItem: ${data.item}\nQuantity: ${data.quantity}\nWeight (kg): ${data.weight}\nMessage: ${data.message || "-"}\nPayment Method: ${data.paymentMethod}\nTotal: ₹${data.total.toFixed(2)}${data.discountAmt > 0 ? `\nDiscount: -₹${data.discountAmt.toFixed(2)}` : ""}\nFinal Amount: ₹${data.finalTotal.toFixed(2)}`
        );
        window.open(`https://wa.me/${phone}?text=${waMsg}`, "_blank");
    };

    const checkoutCart = () => {
        let orderSummary = cart.map((item, i) => 
            `${i+1}. ${item.item} - Qty: ${item.quantity}, Wt: ${item.weight}kg, ₹${item.finalTotal.toFixed(2)}`
        ).join("\n");
        const grandTotal = cart.reduce((acc, item) => acc + item.finalTotal, 0);
        const phone = "919289282269";
        const waMsg = encodeURIComponent(`Cake House Cart Order:\n\n${orderSummary}\n\nGrand Total: ₹${grandTotal.toFixed(2)}`);
        window.open(`https://wa.me/${phone}?text=${waMsg}`, "_blank");
    };

    return (
        <section className="order-section" id="order">
            <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '60px' }}>Order Online</h2>
            <div className="order-container">
                <form className="order-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" name="name" required onChange={handleInputChange} value={formData.name} />
                    </div>
                    <div className="form-group">
                        <label>Select Item</label>
                        <select name="item" onChange={handleInputChange} value={formData.item}>
                            {Object.keys(priceList).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Quantity (for cookies)</label>
                        <input type="number" name="quantity" min="1" onChange={handleInputChange} value={formData.quantity} />
                    </div>
                    <div className="form-group">
                        <label>Weight in kg (for cakes)</label>
                        <input type="number" name="weight" min="0.5" step="0.5" onChange={handleInputChange} value={formData.weight} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" name="number" required onChange={handleInputChange} value={formData.number} />
                    </div>
                    <div className="form-group">
                        <label>Delivery Date & Time</label>
                        <input type="datetime-local" name="date" required onChange={handleInputChange} value={formData.date} />
                    </div>
                    <div className="form-group">
                        <label>Delivery Location</label>
                        <input type="text" name="location" required onChange={handleInputChange} value={formData.location} />
                    </div>
                    <div className="form-group">
                        <label>Discount Code (CAKE10)</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
                            <button type="button" onClick={applyDiscount} className="order-btn" style={{ padding: '8px 15px' }}>Apply</button>
                        </div>
                        <span style={{ color: discountValue > 0 ? 'green' : 'red', fontSize: '0.9rem' }}>{discountMsg}</span>
                    </div>
                    <button type="submit" className="order-btn">Generate Bill</button>
                </form>

                <div className="bill-area">
                    {bill && (
                        <div className={`bill-display active`}>
                            <h3 style={{ color: '#ff6b6b', marginTop: 0 }}>Order Bill</h3>
                            <p><b>Item:</b> {bill.item}</p>
                            <p><b>Total:</b> ₹{bill.total.toFixed(2)}</p>
                            {bill.discountAmt > 0 && <p><b>Discount:</b> -₹{bill.discountAmt.toFixed(2)}</p>}
                            <p><b>Final:</b> ₹{bill.finalTotal.toFixed(2)}</p>
                            <img src="/assets/Qr code.jpg" className="qr-code" alt="QR Code" />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                <button className="order-btn" onClick={() => sendWhatsApp(bill)} style={{ flex: 1, backgroundColor: '#25D366' }}>Send WhatsApp</button>
                                <button className="order-btn" onClick={addToCart} style={{ flex: 1 }}>Add to Cart</button>
                            </div>
                        </div>
                    )}

                    {cart.length > 0 && (
                        <div className="cart-display">
                            <h3 style={{ color: '#4ecdc4', marginTop: 0 }}>Your Cart ({cart.length})</h3>
                            {cart.map((item, i) => (
                                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{item.item} - ₹{item.finalTotal.toFixed(2)}</span>
                                    <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
                                </div>
                            ))}
                            <div style={{ marginTop: '15px' }}>
                                <b>Grand Total: ₹{cart.reduce((acc, item) => acc + item.finalTotal, 0).toFixed(2)}</b>
                                <button className="order-btn" onClick={checkoutCart} style={{ width: '100%', marginTop: '15px', backgroundColor: '#25D366' }}>Checkout All</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Order;
