import {
  FaHome,
  FaBox,
  FaChartBar,
  FaCog,
  FaTimes,
} from "react-icons/fa";

function Sidebar({ activePage, setActivePage, isOpen, onClose }) {

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      name: "Products",
      icon: <FaBox />,
    },
    {
      name: "Analytics",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      icon: <FaCog />,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static
          z-40
          top-0 left-0
          h-full
          w-64
          bg-gray-900
          text-white
          transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          transition-transform
        `}
      >

        <div className="p-5 flex justify-between items-center lg:hidden">

          <h2 className="text-xl font-bold">
            Menu
          </h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <div className="p-5 hidden lg:block">

          <h2 className="text-xl font-bold">
            Admin Panel
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Product Management
          </p>

        </div>

        <div className="px-3 space-y-2">

          {menuItems.map((item) => (

            <button
              key={item.name}
              onClick={() => {
                setActivePage(item.name);
                onClose();
              }}
              className={`
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-lg
                text-left
                transition
                ${
                  activePage === item.name
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }
              `}
            >

              {item.icon}

              <span>
                {item.name}
              </span>

            </button>

          ))}

        </div>

      </aside>
    </>
  );
}

export default Sidebar;