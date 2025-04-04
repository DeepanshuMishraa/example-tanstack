ALTER TABLE "exercises" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "exercises" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "exercises" ADD COLUMN "exercise" text;--> statement-breakpoint
ALTER TABLE "exercises" ADD COLUMN "logged_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "reps";--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "calories";--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "duration";--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "time_of_day";--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "notes";--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "updated_at";