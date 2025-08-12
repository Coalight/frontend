import { NextRequest, NextResponse } from "next/server";

// delete specific asset
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const assetId = params.id;
    const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/assets/${assetId}`;

    const response = await fetch(expressUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "set-cookie": response.headers.get("set-cookie") || "",
      },
      status: response.status,
    });
  } catch (error) {
    console.error("Error in DELETE /api/assets/[assetId]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
