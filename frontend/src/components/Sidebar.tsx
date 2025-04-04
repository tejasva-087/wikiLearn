import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-1/6 bg-white p-4 shadow-md">
      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center text-xl space-x-3 text-gray-700 p-3 rounded-xl transition ${
              isActive
                ? "bg-gray-200 text-blue-500"
                : "hover:text-blue-500 hover:bg-gray-200"
            }`
          }
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.987 11.8869L15.237 3.13691C14.9089 2.80897 14.4639 2.62476 14 2.62476C13.5361 2.62476 13.0911 2.80897 12.763 3.13691L4.01298 11.8869C3.84969 12.049 3.72025 12.2419 3.63218 12.4545C3.54412 12.667 3.49919 12.895 3.50001 13.125V23.625C3.50001 23.8571 3.5922 24.0797 3.75629 24.2438C3.92039 24.4079 4.14295 24.5 4.37501 24.5H11.375C11.6071 24.5 11.8296 24.4079 11.9937 24.2438C12.1578 24.0797 12.25 23.8571 12.25 23.625V17.5H15.75V23.625C15.75 23.8571 15.8422 24.0797 16.0063 24.2438C16.1704 24.4079 16.3929 24.5 16.625 24.5H23.625C23.8571 24.5 24.0796 24.4079 24.2437 24.2438C24.4078 24.0797 24.5 23.8571 24.5 23.625V13.125C24.5008 12.895 24.4559 12.667 24.3678 12.4545C24.2798 12.2419 24.1503 12.049 23.987 11.8869ZM22.75 22.75H17.5V16.625C17.5 16.393 17.4078 16.1704 17.2437 16.0063C17.0796 15.8422 16.8571 15.75 16.625 15.75H11.375C11.1429 15.75 10.9204 15.8422 10.7563 16.0063C10.5922 16.1704 10.5 16.393 10.5 16.625V22.75H5.25001V13.125L14 4.37504L22.75 13.125V22.75Z"
              fill="#27272A"
            />
          </svg>
          <span>Overview</span>
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `flex items-center text-xl space-x-3 text-gray-700 p-3 rounded-xl transition ${
              isActive
                ? "bg-gray-200 text-blue-500"
                : "hover:text-blue-500 hover:bg-gray-200"
            }`
          }
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.3367 21.279L21.7066 4.01958C21.6596 3.79387 21.5685 3.57967 21.4385 3.38927C21.3086 3.19888 21.1422 3.03604 20.9491 2.91011C20.756 2.78419 20.5399 2.69766 20.3133 2.65549C20.0867 2.61333 19.8539 2.61636 19.6284 2.66442L14.5086 3.76473C14.0557 3.86389 13.6603 4.13785 13.4084 4.52702C13.1565 4.91618 13.0684 5.38908 13.1633 5.84286L16.7934 23.1022C16.8743 23.496 17.0883 23.8499 17.3995 24.1045C17.7106 24.359 18.0999 24.4987 18.5019 24.5C18.6261 24.4999 18.75 24.4867 18.8716 24.4607L23.9914 23.3604C24.4448 23.261 24.8406 22.9865 25.0926 22.5966C25.3446 22.2068 25.4323 21.7332 25.3367 21.279ZM14.875 5.4852C14.875 5.47864 14.875 5.47536 14.875 5.47536L19.9938 4.38161L20.358 6.11739L15.2392 7.2188L14.875 5.4852ZM15.5991 8.92723L20.72 7.82802L21.0853 9.56708L15.9688 10.6674L15.5991 8.92723ZM16.3253 12.3802L21.4463 11.2799L22.9009 18.1968L17.78 19.2971L16.3253 12.3802ZM23.625 21.6497L18.5062 22.7435L18.142 21.0077L23.2608 19.9063L23.625 21.6399C23.625 21.6465 23.625 21.6497 23.625 21.6497ZM11.375 3.50005H6.125C5.66087 3.50005 5.21575 3.68442 4.88756 4.01261C4.55937 4.3408 4.375 4.78592 4.375 5.25005V22.75C4.375 23.2142 4.55937 23.6593 4.88756 23.9875C5.21575 24.3157 5.66087 24.5 6.125 24.5H11.375C11.8391 24.5 12.2842 24.3157 12.6124 23.9875C12.9406 23.6593 13.125 23.2142 13.125 22.75V5.25005C13.125 4.78592 12.9406 4.3408 12.6124 4.01261C12.2842 3.68442 11.8391 3.50005 11.375 3.50005ZM6.125 5.25005H11.375V7.00005H6.125V5.25005ZM6.125 8.75005H11.375V19.25H6.125V8.75005ZM11.375 22.75H6.125V21H11.375V22.75Z"
              fill="#52525C"
            />
          </svg>
          <span>Courses</span>
        </NavLink>
        <NavLink
          to="/badges"
          className={({ isActive }) =>
            `flex items-center text-xl space-x-3 text-gray-700 p-3 rounded-xl transition ${
              isActive
                ? "bg-gray-200 text-blue-500"
                : "hover:text-blue-500 hover:bg-gray-200"
            }`
          }
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.625 10.5001C23.626 8.87807 23.217 7.28211 22.4361 5.86044C21.6551 4.43877 20.5276 3.23752 19.1582 2.36825C17.7887 1.49899 16.2218 0.989906 14.603 0.888292C12.9841 0.786678 11.3659 1.09583 9.89848 1.78703C8.43109 2.47823 7.16218 3.52906 6.20961 4.84191C5.25704 6.15477 4.65171 7.68707 4.44984 9.29649C4.24796 10.9059 4.4561 12.5402 5.05491 14.0477C5.65372 15.5551 6.62379 16.8868 7.875 17.919V26.2501C7.87489 26.3993 7.91295 26.5461 7.98556 26.6765C8.05817 26.8068 8.16292 26.9165 8.28984 26.995C8.41676 27.0734 8.56165 27.1181 8.71073 27.1248C8.8598 27.1315 9.00811 27.1 9.14156 27.0332L14 24.6095L18.8595 27.0387C18.9814 27.097 19.115 27.1266 19.25 27.1251C19.4821 27.1251 19.7046 27.0329 19.8687 26.8688C20.0328 26.7047 20.125 26.4822 20.125 26.2501V17.919C21.2198 17.0174 22.1014 15.8845 22.7065 14.6018C23.3116 13.3191 23.6253 11.9184 23.625 10.5001ZM6.125 10.5001C6.125 8.94257 6.58686 7.42002 7.45218 6.12498C8.31749 4.82995 9.5474 3.82059 10.9864 3.22455C12.4253 2.62851 14.0087 2.47256 15.5363 2.77642C17.0639 3.08027 18.4671 3.8303 19.5685 4.93163C20.6698 6.03297 21.4198 7.43616 21.7237 8.96376C22.0275 10.4914 21.8716 12.0748 21.2756 13.5137C20.6795 14.9527 19.6702 16.1826 18.3751 17.0479C17.0801 17.9132 15.5575 18.3751 14 18.3751C11.9121 18.3728 9.91044 17.5424 8.43409 16.066C6.95775 14.5897 6.12732 12.588 6.125 10.5001ZM18.375 24.8348L14.3905 22.8431C14.2689 22.7822 14.1348 22.7506 13.9989 22.7506C13.863 22.7506 13.7289 22.7822 13.6073 22.8431L9.625 24.8348V19.0718C10.9795 19.7641 12.4789 20.1251 14 20.1251C15.5211 20.1251 17.0205 19.7641 18.375 19.0718V24.8348ZM14 16.6251C15.2114 16.6251 16.3956 16.2659 17.4029 15.5929C18.4101 14.9198 19.1952 13.9632 19.6588 12.844C20.1224 11.7248 20.2436 10.4933 20.0073 9.30517C19.771 8.11704 19.1876 7.02567 18.331 6.16907C17.4744 5.31247 16.3831 4.72913 15.1949 4.49279C14.0068 4.25646 12.7753 4.37775 11.6561 4.84134C10.5369 5.30492 9.58027 6.08998 8.90725 7.09723C8.23423 8.10448 7.875 9.28869 7.875 10.5001C7.87674 12.124 8.52261 13.6809 9.67089 14.8292C10.8192 15.9775 12.3761 16.6234 14 16.6251ZM14 6.1251C14.8653 6.1251 15.7112 6.38169 16.4306 6.86242C17.1501 7.34315 17.7108 8.02643 18.042 8.82586C18.3731 9.62529 18.4597 10.505 18.2909 11.3536C18.1221 12.2023 17.7054 12.9818 17.0936 13.5937C16.4817 14.2055 15.7022 14.6222 14.8535 14.791C14.0049 14.9598 13.1252 14.8732 12.3258 14.5421C11.5263 14.2109 10.8431 13.6502 10.3623 12.9307C9.88159 12.2113 9.625 11.3654 9.625 10.5001C9.625 9.33978 10.0859 8.22698 10.9064 7.40651C11.7269 6.58604 12.8397 6.1251 14 6.1251Z"
              fill="#52525C"
            />
          </svg>
          <span>Badges</span>
        </NavLink>
        <NavLink
          to="/certificates"
          className={({ isActive }) =>
            `flex items-center text-xl space-x-3 text-gray-700 p-3 rounded-xl transition ${
              isActive
                ? "bg-gray-200 text-blue-500"
                : "hover:text-blue-500 hover:bg-gray-200"
            }`
          }
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 14.875C14 15.1071 13.9078 15.3296 13.7437 15.4937C13.5796 15.6578 13.3571 15.75 13.125 15.75H7.875C7.64294 15.75 7.42038 15.6578 7.25628 15.4937C7.09219 15.3296 7 15.1071 7 14.875C7 14.6429 7.09219 14.4204 7.25628 14.2563C7.42038 14.0922 7.64294 14 7.875 14H13.125C13.3571 14 13.5796 14.0922 13.7437 14.2563C13.9078 14.4204 14 14.6429 14 14.875ZM13.125 10.5H7.875C7.64294 10.5 7.42038 10.5922 7.25628 10.7563C7.09219 10.9204 7 11.1429 7 11.375C7 11.6071 7.09219 11.8296 7.25628 11.9937C7.42038 12.1578 7.64294 12.25 7.875 12.25H13.125C13.3571 12.25 13.5796 12.1578 13.7437 11.9937C13.9078 11.8296 14 11.6071 14 11.375C14 11.1429 13.9078 10.9204 13.7437 10.7563C13.5796 10.5922 13.3571 10.5 13.125 10.5ZM25.375 17.6608V24.5C25.3764 24.6543 25.337 24.8061 25.2607 24.9403C25.1845 25.0744 25.0742 25.1859 24.9409 25.2637C24.8077 25.3414 24.6562 25.3825 24.502 25.3829C24.3477 25.3832 24.1961 25.3428 24.0625 25.2656L21.4375 23.7628L18.8125 25.2656C18.6789 25.3428 18.5273 25.3832 18.373 25.3829C18.2188 25.3825 18.0673 25.3414 17.9341 25.2637C17.8008 25.1859 17.6905 25.0744 17.6143 24.9403C17.538 24.8061 17.4986 24.6543 17.5 24.5V21.875H4.375C3.91087 21.875 3.46575 21.6906 3.13756 21.3624C2.80937 21.0342 2.625 20.5891 2.625 20.125V6.125C2.625 5.66087 2.80937 5.21575 3.13756 4.88756C3.46575 4.55937 3.91087 4.375 4.375 4.375H23.625C24.0891 4.375 24.5342 4.55937 24.8624 4.88756C25.1906 5.21575 25.375 5.66087 25.375 6.125V9.46422C25.9281 9.9939 26.3683 10.6301 26.669 11.3344C26.9697 12.0387 27.1248 12.7967 27.1248 13.5625C27.1248 14.3283 26.9697 15.0863 26.669 15.7906C26.3683 16.4949 25.9281 17.1311 25.375 17.6608ZM17.5 20.125V17.6608C16.5465 16.7412 15.9439 15.5176 15.7961 14.2012C15.6484 12.8847 15.9649 11.558 16.6909 10.4499C17.4169 9.34189 18.5069 8.52201 19.7728 8.13179C21.0387 7.74157 22.4012 7.80548 23.625 8.3125V6.125H4.375V20.125H17.5ZM23.625 18.8125C22.932 19.102 22.1885 19.2511 21.4375 19.2511C20.6865 19.2511 19.943 19.102 19.25 18.8125V22.9928L21 21.9909C21.1322 21.9154 21.2819 21.8756 21.4342 21.8756C21.5865 21.8756 21.7362 21.9154 21.8684 21.9909L23.6184 22.9928L23.625 18.8125ZM25.375 13.5625C25.375 12.7837 25.1441 12.0225 24.7114 11.3749C24.2788 10.7274 23.6638 10.2227 22.9443 9.92472C22.2248 9.6267 21.4331 9.54873 20.6693 9.70066C19.9055 9.85259 19.2039 10.2276 18.6533 10.7783C18.1026 11.3289 17.7276 12.0305 17.5757 12.7943C17.4237 13.5581 17.5017 14.3498 17.7997 15.0693C18.0977 15.7888 18.6024 16.4038 19.2499 16.8364C19.8975 17.2691 20.6587 17.5 21.4375 17.5C21.9546 17.5 22.4666 17.3982 22.9443 17.2003C23.422 17.0024 23.8561 16.7124 24.2217 16.3467C24.5874 15.9811 24.8774 15.547 25.0753 15.0693C25.2732 14.5916 25.375 14.0796 25.375 13.5625Z"
              fill="#52525C"
            />
          </svg>
          <span>Certificates</span>
        </NavLink>
        <NavLink
          to="/forum"
          className={({ isActive }) =>
            `flex items-center text-xl space-x-3 text-gray-700 p-3 rounded-xl transition ${
              isActive
                ? "bg-gray-200 text-blue-500"
                : "hover:text-blue-500 hover:bg-gray-200"
            }`
          }
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.775 16.45C26.6831 16.519 26.5785 16.5691 26.4672 16.5977C26.3558 16.6262 26.24 16.6325 26.1262 16.6162C26.0125 16.6 25.9031 16.5615 25.8042 16.5029C25.7053 16.4444 25.6189 16.367 25.55 16.275C25.0226 15.5661 24.3361 14.991 23.5459 14.5958C22.7556 14.2007 21.8836 13.9966 21 14C20.8279 14 20.6597 13.9493 20.5163 13.8541C20.3729 13.759 20.2608 13.6237 20.1939 13.4652C20.1485 13.3575 20.1251 13.2419 20.1251 13.125C20.1251 13.0082 20.1485 12.8925 20.1939 12.7849C20.2608 12.6263 20.3729 12.4911 20.5163 12.3959C20.6597 12.3008 20.8279 12.25 21 12.25C21.4909 12.25 21.972 12.1123 22.3887 11.8525C22.8053 11.5927 23.1407 11.2213 23.3568 10.7805C23.5729 10.3397 23.661 9.84708 23.6112 9.35866C23.5614 8.87024 23.3756 8.40558 23.0749 8.01746C22.7743 7.62934 22.3708 7.33332 21.9103 7.16302C21.4499 6.99272 20.9509 6.95496 20.47 7.05405C19.9891 7.15313 19.5457 7.38507 19.1901 7.72354C18.8344 8.062 18.5809 8.49342 18.4581 8.96878C18.4294 9.0801 18.379 9.18466 18.3099 9.27651C18.2407 9.36836 18.1542 9.4457 18.0552 9.5041C17.9561 9.56249 17.8466 9.60082 17.7327 9.61688C17.6189 9.63293 17.503 9.62641 17.3917 9.59769C17.2804 9.56896 17.1758 9.51859 17.084 9.44945C16.9921 9.38031 16.9148 9.29376 16.8564 9.19474C16.798 9.09571 16.7597 8.98615 16.7436 8.87232C16.7276 8.75848 16.7341 8.6426 16.7628 8.53128C16.9332 7.87209 17.255 7.26176 17.7028 6.74885C18.1505 6.23594 18.7118 5.83461 19.3419 5.57679C19.9721 5.31897 20.6537 5.21178 21.3325 5.26374C22.0114 5.3157 22.6688 5.52538 23.2523 5.87611C23.8359 6.22683 24.3295 6.70891 24.694 7.28399C25.0585 7.85907 25.2837 8.51127 25.3517 9.18871C25.4198 9.86615 25.3288 10.5501 25.086 11.1862C24.8432 11.8223 24.4553 12.3929 23.9531 12.8527C25.1429 13.3678 26.1772 14.1853 26.9533 15.2239C27.0222 15.3161 27.0723 15.421 27.1007 15.5325C27.129 15.644 27.1351 15.7601 27.1185 15.874C27.102 15.9879 27.0631 16.0974 27.0041 16.1962C26.9452 16.2951 26.8673 16.3813 26.775 16.45ZM20.8819 23.1875C20.9452 23.2871 20.9877 23.3985 21.0068 23.5149C21.026 23.6314 21.0214 23.7505 20.9933 23.8651C20.9652 23.9797 20.9143 24.0875 20.8435 24.1819C20.7727 24.2763 20.6835 24.3554 20.5813 24.4145C20.4792 24.4736 20.3661 24.5113 20.249 24.5256C20.1318 24.5398 20.013 24.5302 19.8997 24.4973C19.7863 24.4644 19.6808 24.409 19.5895 24.3342C19.4981 24.2595 19.4228 24.1671 19.3681 24.0625C18.8169 23.1292 18.0319 22.3557 17.0905 21.8184C16.1491 21.281 15.0839 20.9984 14 20.9984C12.9161 20.9984 11.8508 21.281 10.9095 21.8184C9.96809 22.3557 9.18307 23.1292 8.63187 24.0625C8.57717 24.1671 8.50188 24.2595 8.41054 24.3342C8.31919 24.409 8.21368 24.4644 8.10034 24.4973C7.987 24.5302 7.86819 24.5398 7.75104 24.5256C7.63389 24.5113 7.52083 24.4736 7.41866 24.4145C7.31649 24.3554 7.22732 24.2763 7.15652 24.1819C7.08572 24.0875 7.03475 23.9797 7.00667 23.8651C6.9786 23.7505 6.974 23.6314 6.99315 23.5149C7.0123 23.3985 7.05481 23.2871 7.11812 23.1875C7.96643 21.73 9.2599 20.583 10.8084 19.915C9.93707 19.2479 9.29668 18.3245 8.97728 17.2745C8.65787 16.2246 8.67551 15.101 9.02771 14.0616C9.37992 13.0222 10.049 12.1194 10.9409 11.4799C11.8327 10.8404 12.9026 10.4965 14 10.4965C15.0974 10.4965 16.1673 10.8404 17.0591 11.4799C17.951 12.1194 18.6201 13.0222 18.9723 14.0616C19.3245 15.101 19.3421 16.2246 19.0227 17.2745C18.7033 18.3245 18.0629 19.2479 17.1916 19.915C18.7401 20.583 20.0336 21.73 20.8819 23.1875ZM14 19.25C14.6922 19.25 15.3689 19.0448 15.9445 18.6602C16.5201 18.2756 16.9687 17.729 17.2336 17.0894C17.4985 16.4499 17.5678 15.7461 17.4327 15.0672C17.2977 14.3883 16.9644 13.7646 16.4749 13.2752C15.9854 12.7857 15.3617 12.4523 14.6828 12.3173C14.0039 12.1822 13.3001 12.2515 12.6606 12.5165C12.0211 12.7814 11.4744 13.23 11.0899 13.8055C10.7053 14.3811 10.5 15.0578 10.5 15.75C10.5 16.6783 10.8687 17.5685 11.5251 18.2249C12.1815 18.8813 13.0717 19.25 14 19.25ZM7.875 13.125C7.875 12.893 7.78281 12.6704 7.61871 12.5063C7.45462 12.3422 7.23206 12.25 7 12.25C6.50904 12.25 6.02794 12.1123 5.61134 11.8525C5.19473 11.5927 4.85933 11.2213 4.64322 10.7805C4.42711 10.3397 4.33896 9.84708 4.38878 9.35866C4.43859 8.87024 4.62439 8.40558 4.92505 8.01746C5.22571 7.62934 5.6292 7.33332 6.08967 7.16302C6.55014 6.99272 7.04914 6.95496 7.52999 7.05405C8.01084 7.15313 8.45427 7.38507 8.80991 7.72354C9.16554 8.062 9.41913 8.49342 9.54187 8.96878C9.59989 9.19359 9.74483 9.38615 9.94482 9.5041C10.1448 9.62204 10.3835 9.6557 10.6083 9.59769C10.8331 9.53967 11.0256 9.39473 11.1436 9.19474C11.2615 8.99475 11.2952 8.75609 11.2372 8.53128C11.0668 7.87209 10.745 7.26176 10.2972 6.74885C9.84948 6.23594 9.28821 5.83461 8.65807 5.57679C8.02793 5.31897 7.34631 5.21178 6.66745 5.26374C5.98859 5.3157 5.33123 5.52538 4.74767 5.87611C4.1641 6.22683 3.67045 6.70891 3.30599 7.28399C2.94152 7.85907 2.71631 8.51127 2.64826 9.18871C2.58021 9.86615 2.67121 10.5501 2.91401 11.1862C3.15682 11.8223 3.54472 12.3929 4.04687 12.8527C2.85827 13.3683 1.82515 14.1858 1.05 15.2239C0.910612 15.4096 0.850687 15.643 0.883404 15.8728C0.91612 16.1027 1.0388 16.3101 1.22445 16.4495C1.4101 16.5889 1.64352 16.6488 1.87335 16.6161C2.10319 16.5834 2.31061 16.4607 2.45 16.275C2.97739 15.5661 3.66385 14.991 4.45414 14.5958C5.24442 14.2007 6.11644 13.9966 7 14C7.23206 14 7.45462 13.9078 7.61871 13.7437C7.78281 13.5797 7.875 13.3571 7.875 13.125Z"
              fill="#52525C"
            />
          </svg>
          <span>Forum</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
