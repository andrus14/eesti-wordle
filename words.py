f_in = open('lemmad2013.txt', 'r')
f_out = open('words.txt', 'w')
words = [l.strip() for l in f_in.readlines()]
c = 0

for w in words:
    if len(w) == 5:
        if w.isalpha() and all(x.islower() for x in w):
            f_out.write(w + '\n')
            c += 1

print(c)