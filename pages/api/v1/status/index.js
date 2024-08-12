async function apiStatus(req, res) {
  const updatedAt = new Date().toISOString();
  res.status(200).json({
    updated_at: updatedAt,
  });
}

export default apiStatus;
