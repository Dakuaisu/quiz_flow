export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get("quizId"); // Get quizId from query params

    // Fetch quiz data from your external API
    const response = await fetch(`https://api.jsonserve.com/Uw5CrX`); // Replace with your API endpoint
    if (!response.ok) throw new Error("Failed to fetch quiz data");
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}