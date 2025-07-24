import React, { useState } from 'react';
import { Order } from '../../../models/Order';
import { OrderCard } from '../OrderCard/OrderCard';
import './OrderCardList.scss';

function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0]; // yyyy-mm-dd
}

export function OrderCardList() {
  const [searchText, setSearchText] = useState('');
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'completed' | 'notCompleted'>('all');
  const [filterDate, setFilterDate] = useState(getTodayString());

  const resetFilters = () => {
    setSearchText('');
    setFilterCompleted('all');
    setFilterDate('');
  };

  const [orders, setOrders] = useState<Order[]>([
    {
      completed: false,
      id: 101,
      date: getTodayString(),
      movies: [
        { Id: 1, Name: 'סרט ילדים', PriceBase: 10 }
      ],
      price: 10,
    },
    {
      completed: true,
      id: 102,
      date: getTodayString(),
      movies: [
        { Id: 2, Name: 'סיפור חיים', PriceBase: 30 }
      ],
      price: 30,
    },
    {
      completed: false,
      id: 103,
      date: getTodayString(),
      movies: [
        { Id: 3, Name: 'הרפתקה', PriceBase: 20 }
      ],
      price: 20,
    },
    {
      completed: true,
      id: 104,
      date: getTodayString(),
      movies: [
        { Id: 4, Name: 'קומדיה', PriceBase: 25 }
      ],
      price: 25,
    },
  ]);

  const handleCompleteOrder = (orderId: number) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, completed: true } : order
      )
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toString().includes(searchText) ||
      order.movies.some(movie =>
        movie.Name?.toLowerCase().includes(searchText.toLowerCase())
      );

    const matchesCompleted =
      filterCompleted === 'all'
        ? true
        : filterCompleted === 'completed'
          ? order.completed
          : !order.completed;

    const matchesDate = filterDate ? order.date === filterDate : true;

    return matchesSearch && matchesCompleted && matchesDate;
  });

  return (
    <div className="order-page p-4 max-w-5xl mx-auto">

      <div className="bg-white rounded-xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[6vh] mb-6">

        <input
          type="text"
          placeholder="חיפוש חופשי"
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value);
            setFilterCompleted('all');
            setFilterDate('');
          }}
          className="p-2 border border-gray-300 rounded"
        />

        {/* סטטוס */}
        <select
          value={filterCompleted}
          onChange={e => {
            setFilterCompleted(e.target.value as any);
            setSearchText('');
            setFilterDate('');
          }}
          className={`p-2 border border-gray-300 rounded ${filterCompleted === 'all' ? 'opacity-60' : ''}`}
        >
          <option value="all">כל הסטטוסים</option>
          <option value="completed">בוצעו</option>
          <option value="notCompleted">לא בוצעו</option>
        </select>

        {/* תאריך הזמנה */}
        <input
          type="date"
          value={filterDate}
          onChange={e => {
            setFilterDate(e.target.value);
            setSearchText('');
            setFilterCompleted('all');
          }}
          className={`p-2 border border-gray-300 rounded ${!filterDate ? 'opacity-60' : ''}`}
        />

        <button
          onClick={resetFilters}
          className="text-cyan-700 hover:underline hover:text-cyan-900 transition-all text-left w-full col-span-full"
        >
          איפוס מסננים
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-2">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} onComplete={handleCompleteOrder} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-8 text-lg">
            לא נמצאו הזמנות.
          </div>
        )}
      </div>
    </div>
  );
}
