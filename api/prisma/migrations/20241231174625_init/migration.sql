-- CreateTable
CREATE TABLE "accounts" (
    "user_id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "settings" (
    "settings_id" SERIAL NOT NULL,
    "business_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("settings_id")
);

-- CreateTable
CREATE TABLE "gallery" (
    "image_id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "offers" (
    "offer_id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "show_home" BOOLEAN NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("offer_id")
);

-- CreateTable
CREATE TABLE "offer_items" (
    "offer_item_id" SERIAL NOT NULL,
    "offer_id" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_details" TEXT,

    CONSTRAINT "offer_items_pkey" PRIMARY KEY ("offer_item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_user_key" ON "accounts"("user");

-- CreateIndex
CREATE UNIQUE INDEX "gallery_image_url_key" ON "gallery"("image_url");

-- AddForeignKey
ALTER TABLE "offer_items" ADD CONSTRAINT "offer_items_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("offer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
