import React, { useState } from 'react';
import { Order } from '../../../models/Order'
import { User, Eye, CalendarDays, X } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onComplete: (orderId: number) => void;
}

export function OrderCard({ order, onComplete }: OrderCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(order.completed); // local copy for instant UI feedback

  const handleComplete = () => {
    setIsCompleted(true); // מייד משנה את התצוגה
    onComplete(order.id); // עדכון לוגיקה חיצונית
    setShowModal(false);
  };
function formatDateHebrew(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
}

  return (
    <div className="relative">
      <div className={`relative border rounded-2xl p-6 shadow-lg bg-white max-w-md mx-auto mb-6 transition 
        ${showModal || showUserModal ? 'opacity-30 pointer-events-none' : ''}`}>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">הזמנה #{order.id}</h2>
          <span className={`text-sm px-3 py-1 rounded-full ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isCompleted ? 'הושלמה' : 'לא הושלמה'}
          </span>
        </div>

        <div className="text-gray-500 mb-4 text-sm flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-cyan-800" /> {formatDateHebrew(order.date)}

        </div>

        <div className="flex flex-col gap-2">
          <button onClick={() => setShowModal(true)} className="text-cyan-800 hover:underline flex items-center gap-1">
            <Eye className="w-4 h-4" /> פרטי ההזמנה
          </button>

          <button onClick={() => setShowUserModal(true)} className="text-cyan-800 hover:underline flex items-center gap-1">
            <User className="w-4 h-4" /> פרטי המשתמש
          </button>
        </div>

        {!isCompleted && (
          <button
            onClick={handleComplete}
            className="w-1/3 py-2 rounded-lg bg-cyan-800 text-white hover:bg-cyan-900 transition ease-in-out duration-300 absolute bottom-7 left-4"
          >
            השלם הזמנה
          </button>
        )}
      </div>

      {/* מודלים (כמו שהיו) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/40"></div>
          <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-black text-xl p-2 rounded-full hover:bg-gray-200 transition"
              aria-label="סגור"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">הזמנה #{order.id}</h2>

            <div className="text-gray-600 mb-2 text-center flex justify-center items-center gap-2">
              <CalendarDays className="w-4 h-4 text-cyan-800" /> {order.date}
            </div>

            <div className="mb-4">
              <ul className="space-y-2">
                {order.movies.map((movie, i) => (
                  <li key={i} className="p-3 bg-gray-100 rounded-lg flex flex-col items-center text-center">
                    <div className="font-semibold mb-2">{movie.Name}</div>
                    <a href={movie.MovieLink} className="text-cyan-800 text-sm underline" target="_blank" rel="noreferrer">
                      קישור
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="font-bold text-lg text-center mb-4">
              ₪ {order.price.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {showUserModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/40"></div>
          <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <button
              onClick={() => setShowUserModal(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-black text-xl p-2 rounded-full hover:bg-gray-200 transition"
              aria-label="סגור"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">פרטי המשתמש להזמנה #{order.id}</h2>

            <div className="text-gray-600 text-center">נתוני משתמש יוצגו כאן בעתיד.</div>
          </div>
        </div>
      )}
    </div>
  );
}
