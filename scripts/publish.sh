set -eux

rm -rf ./dist

pnpm build

cd ./dist

git init
git checkout -b gh-pages
git add .
git commit -m "feat: publish"
git remote add origin https://github.com/datenlord/xline-home.git
git push origin gh-pages -f