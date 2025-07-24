
export interface OrderData {
    email: string;
    movieName: string;
  }
  export const submitOrder = async (od: OrderData) => {
    const response = await fetch('https://localhost:7229/api/Order/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(od),
    });
  
    const text = await response.text();
  
    try {
      const result = JSON.parse(text);
      console.log(result);
    } catch (e) {
      console.error("התגובה מהשרת אינה JSON:", text);
      throw new Error("שגיאה: תגובת השרת אינה JSON תקין");
    }
  };
  