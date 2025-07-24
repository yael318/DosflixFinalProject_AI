
import { DialogPanel, Dialog, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Order } from "../../../models/Order";

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export default function OrdersModal({ isOpen, onClose, orders }: OrdersModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-lg p-6 shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 left-3 text-gray-500 hover:text-black"
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <DialogTitle className="text-xl font-bold mb-4 text-center">
            הזמנות מהשנה האחרונה
          </DialogTitle>

          <table className="w-full border-collapse border border-gray-300 text-right text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2">מס׳ הזמנה</th>
                <th className="border border-gray-300 px-3 py-2">תאריך</th>
                <th className="border border-gray-300 px-3 py-2">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    לא נמצאו הזמנות.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      {order.id}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {new Date(order.date).toLocaleDateString('he-IL')}
                    </td>
                    <td
                      className={`border border-gray-300 px-3 py-2 font-semibold ${
                        order.completed ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {order.completed ? "טופל" : "לא טופל"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
