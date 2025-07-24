
// import React, { useState } from "react";
// import { UserCard } from "../UserCard/UserCard";
// import { User, Gender, AgeGroup,GenderType } from "../../../models/User";
// import "./UserCardList.scss";
// import { Order } from "@/models/Order";

// const users: User[] = [
//   {
//     Name: "חיים",
//     Phone: "050-1234567",
//     Email: "chaim@gmail.com",
//     Id: 1,
//     Address: "רחוב הדוגמה 5",
//     Gender: Gender.male,
//     AgeGroup: AgeGroup.Babies
//   },
//   {
//     Name: "לאה",
//     Phone: "050-1234567",
//     Email: "lea@gmail.com",
//     Id: 2,
//     Address: "רחוב הדוגמה 5",
//     Gender: Gender.female,
//     AgeGroup: AgeGroup.Teens
//   },
//   {
//     Name: "מיכאל",
//     Phone: "050-1234567",
//     Email: "michael@gmail.com",
//     Id: 3,
//     Address: "רחוב הדוגמה 5",
//     Gender: Gender.male,
//     AgeGroup: AgeGroup.Adult
//   },
//   {
//     Name: "אלישבע",
//     Phone: "050-1234567",
//     Email: "elisheva@gmail.com",
//     Id: 4,
//     Address: "רחוב הדוגמה 5",
//     Gender: Gender.female,
//     AgeGroup: AgeGroup.Children
//   },
// ];

// const orders: Order[] = [
//   {
//     id: 1,
//     date: "2025-05-01",
//     movies: [
//       { Id: 101, Name: "סרט א",PriceBase:95 },
//       { Id: 102, Name: "סרט ב",PriceBase:77 },
//     ],
//     price: 75,
//     completed: true,
//   },
//   {
//     id: 2,
//     date: "2025-04-20",
//     movies: [{ Id: 103, Name: "סרט ג",PriceBase:54 }],
//     price: 30,
//     completed: false,
//   },
// ];

// export function UserCardList() {
//   const [selectedGender, setSelectedGender] = useState<"all" | GenderType>("all");
//   const [searchText, setSearchText] = useState("");

//   const resetFilters = () => {
//     setSearchText("");
//     setSelectedGender("all");
//   };

//   const handleGetOrders = async (userId: number): Promise<Order[]> => {
//     const userOrders = orders.filter(order => order.id === userId);
//     return userOrders;
//   };

//   const filteredUsers = users.filter(user => {
//     const matchesSearch =
//       user.Name.toLowerCase().includes(searchText.toLowerCase()) ||
//       user.Email.toLowerCase().includes(searchText.toLowerCase()) ||
//       user.Phone.includes(searchText) ||
//       user.Address.toLowerCase().includes(searchText.toLowerCase());

//     const matchesGender =
//       selectedGender === "all" ? true : user.Gender === selectedGender;

//     return matchesSearch && matchesGender;
//   });

//   return (
//     <div className="user-page p-4 max-w-5xl mx-auto">
//       {/* Filters */}
//       {/* <div className="bg-white rounded-xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[6vh] mb-6">

//         <input
//           type="text"
//           placeholder="חיפוש חופשי"
//           value={searchText}
//           onChange={e => {
//             setSearchText(e.target.value);
//             setSelectedGender("all"); // איפוס מגדר בעת חיפוש
//           }}
//           className="p-2 border border-gray-300 rounded"
//         />

//         <select
//           value={selectedGender === "all" ? "all" : selectedGender === Gender.male ? "male" : "female"}
//           onChange={(e) => {
//             const value = e.target.value;
//             setSelectedGender(value === "all" ? "all" : value === "male" ? Gender.male : Gender.female);
//             setSearchText(""); // איפוס חיפוש בעת שינוי מגדר
//           }}
//           className={`p-2 border border-gray-300 rounded ${selectedGender === "all" ? "opacity-60" : ""}`}
//         >
//           <option value="all">בחר מגדר</option>
//           <option value="male">זכר</option>
//           <option value="female">נקבה</option>
//         </select>

//         <button
//           onClick={resetFilters}
//           className="text-cyan-700 hover:underline hover:text-cyan-900 transition-all text-left w-full col-span-full"
//         >
//           איפוס מסננים
//         </button>
//       </div> */}
//       <div dir="rtl" className="bg-white rounded-xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[6vh] mb-6">
//         <input
//           type="text"
//           placeholder="חיפוש חופשי"
//           value={searchText}
//           onChange={e => {
//             setSearchText(e.target.value);
//             setSelectedGender("all"); // איפוס מגדר בעת חיפוש
//           }}
//           className="p-2 border border-gray-300 rounded"
//         />

//         {/* סטטוס */}
//         <select
//           value={selectedGender === "all" ? "all" : selectedGender === Gender.male ? "male" : "female"}
//           onChange={(e) => {
//             const value = e.target.value;
//             setSelectedGender(value === "all" ? "all" : value === "male" ? Gender.male : Gender.female);
//             setSearchText(""); // איפוס חיפוש בעת שינוי מגדר
//           }}
//           className={`p-2 border border-gray-300 rounded ${selectedGender === "all" ? "opacity-60" : ""}`}
//         >
//           <option value="all">בחר מגדר</option>
//           <option value="male">זכר</option>
//           <option value="female">נקבה</option>
//         </select>



//         <button
//           onClick={resetFilters}
//           className="text-cyan-700 hover:underline hover:text-cyan-900 transition-all text-left w-full col-span-full"
//         >
//           איפוס מסננים
//         </button>
//       </div>
//       {/* Cards */}
//       <div className="grid md:grid-cols-3 gap-2">
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map(user => (
//             <UserCard key={user.Id} user={user} getOrders={handleGetOrders} />
//           ))
//         ) : (
//           <div className="col-span-full text-center text-gray-500 mt-8 text-lg">
//             לא נמצאו משתמשים.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { UserCard } from "../UserCard/UserCard";
import { User, Gender, AgeGroup, GenderType } from "../../../models/User";
import "./UserCardList.scss";
import { Order } from "@/models/Order";
import axios from "axios";

export function UserCardList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedGender, setSelectedGender] = useState<"all" | GenderType>("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("https://localhost:7229/DosFlix/Users");
        setUsers(response.data);
      } catch (error) {
        console.error("שגיאה בטעינת המשתמשים:", error);
      }
    };

    fetchUsers();
  }, []);

  const resetFilters = () => {
    setSearchText("");
    setSelectedGender("all");
  };

  const handleGetOrders = async (userId: number): Promise<Order[]> => {
    // כאן נשאר זמני או תבני גם קריאה לשרת לפי id
    return [];
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.Name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.Email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.Phone.includes(searchText) ||
      user.Address.toLowerCase().includes(searchText.toLowerCase());

    const matchesGender =
      selectedGender === "all" ? true : user.Gender === selectedGender;

    return matchesSearch && matchesGender;
  });

  return (
    <div className="user-page p-4 max-w-5xl mx-auto">
      <div dir="rtl" className="bg-white rounded-xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[6vh] mb-6">
        <input
          type="text"
          placeholder="חיפוש חופשי"
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value);
            setSelectedGender("all");
          }}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={selectedGender === "all" ? "all" : selectedGender}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedGender(value === "all" ? "all" : value as GenderType);
            setSearchText("");
          }}
          className={`p-2 border border-gray-300 rounded ${selectedGender === "all" ? "opacity-60" : ""}`}
        >
          <option value="all">בחר מגדר</option>
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
        </select>
        <button
          onClick={resetFilters}
          className="text-cyan-700 hover:underline hover:text-cyan-900 transition-all text-left w-full col-span-full"
        >
          איפוס מסננים
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.Id} user={user} getOrders={handleGetOrders} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-8 text-lg">
            לא נמצאו משתמשים.
          </div>
        )}
      </div>
    </div>
  );
}
