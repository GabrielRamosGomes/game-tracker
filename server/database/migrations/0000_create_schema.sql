CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"country" integer NOT NULL,
	"description" text NOT NULL,
	"logo" text NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"status" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "companies_name_unique" UNIQUE("name"),
	CONSTRAINT "companies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "company_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "company_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "countries_name_unique" UNIQUE("name"),
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "game_engines" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo" text NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "game_engines_name_unique" UNIQUE("name"),
	CONSTRAINT "game_engines_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "game_engines_games" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"game_engine_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_keywords" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"keyword_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_modes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "game_modes_name_unique" UNIQUE("name"),
	CONSTRAINT "game_modes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "game_player_perspectives" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"player_perspective_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "game_types_type_unique" UNIQUE("type")
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"aggregated_rating" numeric NOT NULL,
	"rating" numeric NOT NULL,
	"game_engine" integer NOT NULL,
	"game_mode" integer NOT NULL,
	"game_type" integer NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "games_name_unique" UNIQUE("name"),
	CONSTRAINT "games_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "genres_name_unique" UNIQUE("name"),
	CONSTRAINT "genres_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "involved_companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"company_id" integer NOT NULL,
	"game_id" integer NOT NULL,
	"developer" boolean NOT NULL,
	"publisher" boolean NOT NULL,
	"porting" boolean NOT NULL,
	"supporting" boolean NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "keywords" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "keywords_name_unique" UNIQUE("name"),
	CONSTRAINT "keywords_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "platform_families" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "platform_families_name_unique" UNIQUE("name"),
	CONSTRAINT "platform_families_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "platform_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "platform_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "platforms" (
	"id" serial PRIMARY KEY NOT NULL,
	"abbreviation" text NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"platform_type" integer NOT NULL,
	"platform_family" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "platforms_name_unique" UNIQUE("name"),
	CONSTRAINT "platforms_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "player_perspectives" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "player_perspectives_name_unique" UNIQUE("name"),
	CONSTRAINT "player_perspectives_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "time_to_beat" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"hastily" integer NOT NULL,
	"normally" integer NOT NULL,
	"completely" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_country_countries_id_fk" FOREIGN KEY ("country") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_status_company_status_id_fk" FOREIGN KEY ("status") REFERENCES "public"."company_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_engines_games" ADD CONSTRAINT "game_engines_games_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_engines_games" ADD CONSTRAINT "game_engines_games_game_engine_id_game_engines_id_fk" FOREIGN KEY ("game_engine_id") REFERENCES "public"."game_engines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_keywords" ADD CONSTRAINT "game_keywords_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_keywords" ADD CONSTRAINT "game_keywords_keyword_id_keywords_id_fk" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_player_perspectives" ADD CONSTRAINT "game_player_perspectives_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_player_perspectives" ADD CONSTRAINT "game_player_perspectives_player_perspective_id_player_perspectives_id_fk" FOREIGN KEY ("player_perspective_id") REFERENCES "public"."player_perspectives"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_game_engine_game_engines_id_fk" FOREIGN KEY ("game_engine") REFERENCES "public"."game_engines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_game_mode_game_modes_id_fk" FOREIGN KEY ("game_mode") REFERENCES "public"."game_modes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_game_type_game_types_id_fk" FOREIGN KEY ("game_type") REFERENCES "public"."game_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involved_companies" ADD CONSTRAINT "involved_companies_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involved_companies" ADD CONSTRAINT "involved_companies_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_platform_type_platform_types_id_fk" FOREIGN KEY ("platform_type") REFERENCES "public"."platform_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_platform_family_platform_families_id_fk" FOREIGN KEY ("platform_family") REFERENCES "public"."platform_families"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "time_to_beat" ADD CONSTRAINT "time_to_beat_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;