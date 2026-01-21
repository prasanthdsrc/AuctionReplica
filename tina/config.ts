import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.TINA_BRANCH || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "auction",
        label: "Auctions",
        path: "content/auctions",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "image", name: "imageUrl", label: "Image" },
          { type: "datetime", name: "startDate", label: "Start Date" },
          { type: "datetime", name: "endDate", label: "End Date" },
          { type: "boolean", name: "isOnline", label: "Is Online Auction" },
          { type: "number", name: "numberOfLots", label: "Number of Lots" },
          { type: "number", name: "buyersPremium", label: "Buyer's Premium (%)" },
          { type: "string", name: "status", label: "Status", options: ["open", "upcoming", "closed"] },
        ],
      },
      {
        name: "product",
        label: "Products",
        path: "content/products",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "image", name: "images", label: "Images", list: true },
          { type: "string", name: "auctionId", label: "Auction ID" },
          { type: "number", name: "lotNumber", label: "Lot Number" },
          { type: "number", name: "estimateLow", label: "Estimate Low" },
          { type: "number", name: "estimateHigh", label: "Estimate High" },
          { type: "number", name: "currentBid", label: "Current Bid" },
          { type: "number", name: "bidsCount", label: "Number of Bids" },
          { type: "string", name: "category", label: "Category" },
          { type: "string", name: "subcategory", label: "Subcategory" },
          { type: "boolean", name: "featured", label: "Featured" },
          {
            type: "object",
            name: "specifications",
            label: "Specifications",
            list: true,
            fields: [
              { type: "string", name: "key", label: "Key" },
              { type: "string", name: "value", label: "Value" },
            ],
          },
        ],
      },
      {
        name: "category",
        label: "Categories",
        path: "content/categories",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Name", required: true },
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "image", name: "imageUrl", label: "Image" },
          { type: "string", name: "description", label: "Description" },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "string", name: "description", label: "Meta Description" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: "string", name: "siteName", label: "Site Name" },
          { type: "string", name: "siteDescription", label: "Site Description" },
          { type: "string", name: "contactEmail", label: "Contact Email" },
          { type: "string", name: "contactPhone", label: "Contact Phone" },
          {
            type: "object",
            name: "heroSlides",
            label: "Hero Slides",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "image", name: "imageUrl", label: "Image" },
              { type: "string", name: "linkUrl", label: "Link URL" },
              { type: "string", name: "linkText", label: "Link Text" },
            ],
          },
        ],
      },
    ],
  },
});
