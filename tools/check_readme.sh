python3 ./gen_readme.py
npx eclint fix "`dirname $0`"/../README.md
npx eyo --only-safe --in-place "`dirname $0`"/../README.md

if git diff --exit-code ; then
    echo "README.md validated"
else
    echo "You need to update README.md"
    exit 42
fi
