import { expect, test } from "@playwright/test";

test("browse skills and open a detail page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /ARS\.FLOW/i })).toBeVisible();

  await page.getByRole("link", { name: "Explore skills" }).first().click();
  await expect(page).toHaveURL(/\/skills/);

  await page.getByRole("link", { name: "Open Skill" }).first().click();
  await expect(page).toHaveURL(/\/skills\/[^/]+$/);

  await expect(page.getByRole("heading", { name: "Failure modes" })).toBeVisible();
});
