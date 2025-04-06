function Notification() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Notification</h2>
      <div className="flex items-center mb-4">
        <img
          alt="Profile picture of Tejasva"
          className="w-10 h-10 rounded-full mr-4"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/PR8ulE0Q5_bPX_oGN49d_xkHpwNXcmW8BUUgbYYeMGM.jpg"
          width="40"
        />
        <p>
          <span className="font-bold">Tejasva</span>
          <span> </span>
          commented on your post.
        </p>
      </div>
      <div className="flex items-center mb-4">
        <img
          alt="Profile picture of Deepak"
          className="w-10 h-10 rounded-full mr-4"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/QVnqea2NOZQbLrCwVhduI6zPqD5m4ljXmQNpk6cwUAg.jpg"
          width="40"
        />
        <p>
          <span className="font-bold">Deepak</span>
          <span> </span>
          liked your post.
        </p>
      </div>
      <div className="flex items-center">
        <img
          alt="Profile picture of Deepak"
          className="w-10 h-10 rounded-full mr-4"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/QVnqea2NOZQbLrCwVhduI6zPqD5m4ljXmQNpk6cwUAg.jpg"
          width="40"
        />
        <p>
          <span className="font-bold">Deepak</span>
          <span> </span>
          commented on your post.
        </p>
      </div>
    </div>
  );
}

export default Notification;
