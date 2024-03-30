const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'teepee', 'restful')
      await expect(page.getByText('Logged in as teepee')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'All blogs' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'teepee', 'restless')
      await expect(page.getByText('Logged in as teepee')).not.toBeVisible()
      await expect(page.getByRole('heading', { name: 'All blogs' })).not.toBeVisible()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'teepee', 'restful')
      await expect(page.getByText('Logged in as teepee')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'All blogs' })).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'TestTitle', 'TestAuthor', 'TestUrl')
      await expect(page.getByText('Succesfully added TestTitle by TestAuthor')).toBeVisible()
      await expect(page.getByText('viewTestTitle (TestAuthor)').nth(1)).toBeVisible()
    })
  })
})