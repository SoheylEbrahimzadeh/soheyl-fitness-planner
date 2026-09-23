CREATE TABLE `meal_plan_grocery_checks` (
	`id` text PRIMARY KEY,
	`meal_plan_id` text NOT NULL,
	`ingredient_id` text NOT NULL,
	`checked_at` integer NOT NULL,
	CONSTRAINT `fk_meal_plan_grocery_checks_meal_plan_id_meal_plans_id_fk` FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plans`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_meal_plan_grocery_checks_ingredient_id_ingredients_id_fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX `meal_plan_grocery_checks_plan_id_idx` ON `meal_plan_grocery_checks` (`meal_plan_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `meal_plan_grocery_checks_unique_idx` ON `meal_plan_grocery_checks` (`meal_plan_id`,`ingredient_id`);