function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-5">
      <div className="flex justify-between items-center">
        <p>
          <strong>Error:</strong> {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >  Retry  </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;