//import logo from "../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm flex flex-row items-start p-0 w-full">
      <div className="flex flex-1 flex-row items-start w-full self-stretch px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between w-full">
          {/* Logo and title */}
          <div className="flex items-center gap-1 sm:gap-2 py-3">
            {/* <img
              alt="Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full"
              src={logo}
              width="32"
              height="32"
            />

            <span className="text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap">
              <span className="text-blue-600">Wiki</span>Learn
            </span>
          </div>

          {/* Navigation - responsive for all screen sizes */}
          <div className="flex items-center gap-2 sm:gap-3 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_90_417)">
                  <path
                    d="M13.125 4.375V1.75C13.125 1.51794 13.2172 1.29538 13.3813 1.13128C13.5454 0.967187 13.7679 0.875 14 0.875C14.2321 0.875 14.4546 0.967187 14.6187 1.13128C14.7828 1.29538 14.875 1.51794 14.875 1.75V4.375C14.875 4.60706 14.7828 4.82962 14.6187 4.99372C14.4546 5.15781 14.2321 5.25 14 5.25C13.7679 5.25 13.5454 5.15781 13.3813 4.99372C13.2172 4.82962 13.125 4.60706 13.125 4.375ZM21 14C21 15.3845 20.5895 16.7378 19.8203 17.889C19.0511 19.0401 17.9579 19.9373 16.6788 20.4672C15.3997 20.997 13.9922 21.1356 12.6344 20.8655C11.2765 20.5954 10.0292 19.9287 9.05025 18.9497C8.07128 17.9708 7.4046 16.7235 7.1345 15.3656C6.86441 14.0078 7.00303 12.6003 7.53284 11.3212C8.06266 10.0421 8.95986 8.94888 10.111 8.17971C11.2622 7.41054 12.6155 7 14 7C15.8559 7.00203 17.6352 7.74018 18.9475 9.05249C20.2598 10.3648 20.998 12.1441 21 14ZM19.25 14C19.25 12.9616 18.9421 11.9466 18.3652 11.0833C17.7883 10.2199 16.9684 9.54699 16.0091 9.14963C15.0498 8.75227 13.9942 8.64831 12.9758 8.85088C11.9574 9.05345 11.0219 9.55346 10.2877 10.2877C9.55346 11.0219 9.05345 11.9574 8.85088 12.9758C8.64831 13.9942 8.75227 15.0498 9.14963 16.0091C9.54699 16.9684 10.2199 17.7883 11.0833 18.3652C11.9466 18.9421 12.9616 19.25 14 19.25C15.3919 19.2486 16.7265 18.695 17.7107 17.7107C18.695 16.7265 19.2486 15.3919 19.25 14ZM6.38094 7.61906C6.54512 7.78325 6.76781 7.87549 7 7.87549C7.23219 7.87549 7.45488 7.78325 7.61906 7.61906C7.78325 7.45488 7.87549 7.23219 7.87549 7C7.87549 6.76781 7.78325 6.54512 7.61906 6.38094L5.86906 4.63094C5.70488 4.46675 5.48219 4.37451 5.25 4.37451C5.01781 4.37451 4.79512 4.46675 4.63094 4.63094C4.46675 4.79512 4.37451 5.01781 4.37451 5.25C4.37451 5.48219 4.46675 5.70488 4.63094 5.86906L6.38094 7.61906ZM6.38094 20.3809L4.63094 22.1309C4.46675 22.2951 4.37451 22.5178 4.37451 22.75C4.37451 22.9822 4.46675 23.2049 4.63094 23.3691C4.79512 23.5332 5.01781 23.6255 5.25 23.6255C5.48219 23.6255 5.70488 23.5332 5.86906 23.3691L7.61906 21.6191C7.70036 21.5378 7.76485 21.4413 7.80884 21.335C7.85284 21.2288 7.87549 21.115 7.87549 21C7.87549 20.885 7.85284 20.7712 7.80884 20.665C7.76485 20.5587 7.70036 20.4622 7.61906 20.3809C7.53777 20.2996 7.44125 20.2352 7.33503 20.1912C7.22882 20.1472 7.11497 20.1245 7 20.1245C6.88503 20.1245 6.77118 20.1472 6.66497 20.1912C6.55875 20.2352 6.46223 20.2996 6.38094 20.3809ZM21 7.875C21.1149 7.87509 21.2288 7.85253 21.335 7.80862C21.4412 7.7647 21.5377 7.70029 21.6191 7.61906L23.3691 5.86906C23.5332 5.70488 23.6255 5.48219 23.6255 5.25C23.6255 5.01781 23.5332 4.79512 23.3691 4.63094C23.2049 4.46675 22.9822 4.37451 22.75 4.37451C22.5178 4.37451 22.2951 4.46675 22.1309 4.63094L20.3809 6.38094C20.2584 6.50331 20.175 6.65928 20.1412 6.82911C20.1073 6.99893 20.1247 7.17497 20.191 7.33494C20.2572 7.49491 20.3695 7.63162 20.5135 7.72776C20.6575 7.82389 20.8268 7.87514 21 7.875ZM21.6191 20.3809C21.4549 20.2168 21.2322 20.1245 21 20.1245C20.7678 20.1245 20.5451 20.2168 20.3809 20.3809C20.2168 20.5451 20.1245 20.7678 20.1245 21C20.1245 21.2322 20.2168 21.4549 20.3809 21.6191L22.1309 23.3691C22.2122 23.4504 22.3087 23.5148 22.415 23.5588C22.5212 23.6028 22.635 23.6255 22.75 23.6255C22.865 23.6255 22.9788 23.6028 23.085 23.5588C23.1913 23.5148 23.2878 23.4504 23.3691 23.3691C23.4504 23.2878 23.5148 23.1913 23.5588 23.085C23.6028 22.9788 23.6255 22.865 23.6255 22.75C23.6255 22.635 23.6028 22.5212 23.5588 22.415C23.5148 22.3087 23.4504 22.2122 23.3691 22.1309L21.6191 20.3809ZM5.25 14C5.25 13.7679 5.15781 13.5454 4.99372 13.3813C4.82962 13.2172 4.60706 13.125 4.375 13.125H1.75C1.51794 13.125 1.29538 13.2172 1.13128 13.3813C0.967187 13.5454 0.875 13.7679 0.875 14C0.875 14.2321 0.967187 14.4546 1.13128 14.6187C1.29538 14.7828 1.51794 14.875 1.75 14.875H4.375C4.60706 14.875 4.82962 14.7828 4.99372 14.6187C5.15781 14.4546 5.25 14.2321 5.25 14ZM14 22.75C13.7679 22.75 13.5454 22.8422 13.3813 23.0063C13.2172 23.1704 13.125 23.3929 13.125 23.625V26.25C13.125 26.4821 13.2172 26.7046 13.3813 26.8687C13.5454 27.0328 13.7679 27.125 14 27.125C14.2321 27.125 14.4546 27.0328 14.6187 26.8687C14.7828 26.7046 14.875 26.4821 14.875 26.25V23.625C14.875 23.3929 14.7828 23.1704 14.6187 23.0063C14.4546 22.8422 14.2321 22.75 14 22.75ZM26.25 13.125H23.625C23.3929 13.125 23.1704 13.2172 23.0063 13.3813C22.8422 13.5454 22.75 13.7679 22.75 14C22.75 14.2321 22.8422 14.4546 23.0063 14.6187C23.1704 14.7828 23.3929 14.875 23.625 14.875H26.25C26.4821 14.875 26.7046 14.7828 26.8687 14.6187C27.0328 14.4546 27.125 14.2321 27.125 14C27.125 13.7679 27.0328 13.5454 26.8687 13.3813C26.7046 13.2172 26.4821 13.125 26.25 13.125Z"
                    fill="#27272A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_90_417">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9 sm:w-11 sm:h-11"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 28 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.2594 23.2434C23.6524 22.1978 22.75 19.2392 22.75 15.375C22.75 13.0544 21.8281 10.8288 20.1872 9.18782C18.5463 7.54687 16.3207 6.625 14 6.625C11.6794 6.625 9.45377 7.54687 7.81283 9.18782C6.17189 10.8288 5.25001 13.0544 5.25001 15.375C5.25001 19.2403 4.34658 22.1978 3.73955 23.2434C3.58453 23.5093 3.50235 23.8113 3.50129 24.119C3.50024 24.4267 3.58034 24.7293 3.73353 24.9962C3.88672 25.263 4.10757 25.4848 4.37382 25.6391C4.64006 25.7934 4.94229 25.8748 5.25001 25.875H9.71361C9.91548 26.8628 10.4524 27.7506 11.2334 28.3882C12.0145 29.0258 12.9918 29.374 14 29.374C15.0083 29.374 15.9856 29.0258 16.7666 28.3882C17.5477 27.7506 18.0845 26.8628 18.2864 25.875H22.75C23.0576 25.8746 23.3597 25.7931 23.6258 25.6387C23.8919 25.4843 24.1126 25.2625 24.2657 24.9957C24.4187 24.7288 24.4987 24.4263 24.4976 24.1187C24.4965 23.8111 24.4144 23.5092 24.2594 23.2434ZM14 27.625C13.4573 27.6248 12.928 27.4565 12.4849 27.1431C12.0419 26.8297 11.7069 26.3867 11.526 25.875H16.4741C16.2932 26.3867 15.9581 26.8297 15.5151 27.1431C15.072 27.4565 14.5427 27.6248 14 27.625ZM5.25001 24.125C6.0922 22.6769 7.00001 19.3212 7.00001 15.375C7.00001 13.5185 7.73751 11.738 9.05027 10.4253C10.363 9.1125 12.1435 8.375 14 8.375C15.8565 8.375 17.637 9.1125 18.9498 10.4253C20.2625 11.738 21 13.5185 21 15.375C21 19.318 21.9056 22.6736 22.75 24.125H5.25001Z"
                  fill="#27272A"
                />
                <circle cx="21" cy="10" r="7" fill="#FF3C38" />
                <path
                  d="M21.408 14.108C20.872 14.108 20.396 14.012 19.98 13.82C19.572 13.62 19.252 13.344 19.02 12.992C18.796 12.64 18.676 12.232 18.66 11.768H19.476C19.5 12.264 19.684 12.664 20.028 12.968C20.38 13.272 20.84 13.424 21.408 13.424C21.992 13.424 22.448 13.276 22.776 12.98C23.112 12.684 23.28 12.28 23.28 11.768C23.28 11.288 23.096 10.904 22.728 10.616C22.36 10.32 21.864 10.172 21.24 10.172H20.436V9.476H21.216C21.552 9.476 21.844 9.412 22.092 9.284C22.348 9.148 22.548 8.964 22.692 8.732C22.836 8.5 22.908 8.232 22.908 7.928C22.908 7.496 22.76 7.144 22.464 6.872C22.176 6.592 21.8 6.452 21.336 6.452C20.864 6.452 20.476 6.592 20.172 6.872C19.876 7.152 19.716 7.524 19.692 7.988H18.888C18.904 7.564 19.02 7.184 19.236 6.848C19.452 6.512 19.744 6.248 20.112 6.056C20.488 5.864 20.904 5.768 21.36 5.768C21.84 5.768 22.26 5.86 22.62 6.044C22.98 6.22 23.26 6.468 23.46 6.788C23.668 7.1 23.772 7.468 23.772 7.892C23.772 8.308 23.648 8.68 23.4 9.008C23.16 9.328 22.82 9.584 22.38 9.776C22.94 9.912 23.372 10.152 23.676 10.496C23.988 10.84 24.144 11.26 24.144 11.756C24.144 12.22 24.028 12.628 23.796 12.98C23.564 13.332 23.244 13.608 22.836 13.808C22.428 14.008 21.952 14.108 21.408 14.108Z"
                  fill="white"
                />
              </svg>

              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-9 w-9 sm:h-11 sm:w-11">
              <AvatarImage
                src="/placeholder.svg?height=44&width=44"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
