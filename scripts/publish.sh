rm -rf ./dist
pnpm i
pnpm build
cd ./dist
git init
git branch gh-pages
git checkout -b gh-pages
git add .
git commit -m "feat: publish"
git remote add origin git@github.com:YINGcnf/test.git
git push origin gh-pages -f