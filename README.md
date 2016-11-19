# angular-style-custom-properties

# demo 

plunker: https://plnkr.co/edit/QHCR92capTrJYJmdjLwU?p=preview


# use

properties you can use:
- app-style
- angular-style-custom-properties
- angular-style-custom-properties-fallback

the most efficient way to use this directive is to use just one property:

```
<div 
    teo-style="{
        "--size": '50%',
        "color": "tomato"
    }"
>component</div>

```

or combined with the fallback

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

try to avoid complex scenario where you use all of them


# improvements 

Every properties is watched, if multiple properties are changing this cause to run init() more than once and run the whole style calculation.
