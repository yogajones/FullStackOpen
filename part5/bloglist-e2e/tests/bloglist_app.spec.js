const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test Person',
        username: 'teepee',
        password: 'restful'
      }
    })
    await page.goto('/')
  })

  test('login form is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Log in to BlogList App' })).toBeVisible()
    
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.locator('input[name="Username"]')).toBeVisible()

    await expect(page.getByText('password')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()

    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
})