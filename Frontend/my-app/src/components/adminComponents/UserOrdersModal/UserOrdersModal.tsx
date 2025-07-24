import React from 'react';

interface Order {
  id: number;
  date: string;
  total: number;
  movies: string[];
  paid: boolean;
  handled: boolean;
}

interface Props {
  orders: Order[];
  onClose: () => void;
}

const UserOrdersModal: React.FC<Props> = ({ orders, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl p-6 relative">
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">הזמנות אחרונות</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm text-right">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">תאריך</th>
                <th className="p-2 border">סרטים</th>
                <th className="p-2 border">סה"כ</th>
                <th className="p-2 border">שולם</th>
                <th className="p-2 border">טופל</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 border">{order.date}</td>
                  <td className="p-2 border">{order.movies.join(', ')}</td>
                  <td className="p-2 border">{order.total} ₪</td>
                  <td className="p-2 border">{order.paid ? 'כן' : 'לא'}</td>
                  <td className="p-2 border">{order.handled ? 'כן' : 'לא'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersModal;
