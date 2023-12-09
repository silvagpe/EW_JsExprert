# a partir da pasta raiz do projeto
#find . -name '*.test.js'

#find . -name '*.test.js' -not -path '*node_modules**'

#npm i -g ipt

#find . -name '*.test.js' -not -path '*node_modules**' | ipt

# find . -name '*.js' -not -path '*node_modules**' \
# | ipt -o \
# | xargs -I '{file}' echo oi {file}


# CONTENT="'use strict';"
# find . -name '*.js' -not -path '*node_modules**' \
# | ipt -o \
# | xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
# /g' {file}

CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
