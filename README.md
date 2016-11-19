# angular-style-custom-properties

# demo 

plunker: https://plnkr.co/edit/QHCR92capTrJYJmdjLwU?p=preview


# use

the most efficient way to use this directive is to use just one property:

```
<div 
    teo-style="{
        "--size": '50%',
        "color": "tomato"
    }"
>component</div>

```

or combined with the

```
<div 
    teo-style="{
        "--size": '50%',
        "color": "tomato"
    }"
    teo-style-custom-properties-fallback="{
        "width": '50%',
        "color": "tomato"
    }"
>component</div>
```

try to avoid complex scenario


# improvements 

Every properties is watch, if multiple are changing this cause to run init() more than once and run the whole style calculation.
